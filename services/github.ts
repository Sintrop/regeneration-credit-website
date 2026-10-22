import { ReleaseProps } from '@/types/github';

interface GetReleasesFromGitHubProps {
    username: string;
    repo: string;
}

export async function getReleasesFromGitHub(props: GetReleasesFromGitHubProps): Promise<ReleaseProps[]> {
    const { repo, username } = props;

    try {
        const response = await fetch(
            `https://api.github.com/repos/${username}/${repo}/releases`,
            { next: { revalidate: 3600 } }
        );
        const data = await response.json();

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

const APPLICATIONS_REPO = 'Sintrop/rc-community-applications';

export interface CommunityApplication {
    id: number;
    role: string;
    name: string;
    wallet: string | null;
    contribution: string;
    contact: string | null;
    url: string;
    createdAt: string;
}

interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string | null;
    html_url: string;
    created_at: string;
    pull_request?: unknown;
    labels: { name: string }[];
}

/** Splits a GitHub issue-form body ("### Label\n\nvalue") into a label -> value map. */
function parseIssueForm(body: string): Record<string, string> {
    const fields: Record<string, string> = {};
    for (const block of body.split(/^### /m)) {
        const [label, ...rest] = block.split('\n');
        if (!label) continue;
        fields[label.trim().toLowerCase()] = rest.join('\n').trim();
    }
    return fields;
}

export async function getCommunityApplications(): Promise<CommunityApplication[]> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${APPLICATIONS_REPO}/issues?state=open&labels=application&per_page=100`,
            { next: { revalidate: 600 } }
        );
        const data = await response.json();
        if (!Array.isArray(data)) return [];

        return (data as GitHubIssue[])
            .filter((issue) => !issue.pull_request)
            .map((issue) => {
                const roleLabel = issue.labels
                    .map((label) => label.name)
                    .find((name) => name.startsWith('role: '));
                const fields = parseIssueForm(issue.body || '');
                const contribution =
                    Object.entries(fields).find(([key]) =>
                        key.startsWith('how can you contribute')
                    )?.[1] || '';
                const walletRaw = fields['wallet address'] || '';
                const wallet = /^0x[a-fA-F0-9]{40}$/.test(walletRaw.trim())
                    ? walletRaw.trim()
                    : null;
                const contact = fields['contact (optional)'] || null;

                return {
                    id: issue.id,
                    role: roleLabel ? roleLabel.replace('role: ', '') : 'other',
                    name:
                        fields['name or handle'] ||
                        issue.title.replace(/^\[[^\]]+\]\s*/, '').trim() ||
                        `#${issue.number}`,
                    wallet,
                    contribution,
                    contact: contact && contact !== '_No response_' ? contact : null,
                    url: issue.html_url,
                    createdAt: issue.created_at,
                };
            });
    } catch {
        return [];
    }
}
