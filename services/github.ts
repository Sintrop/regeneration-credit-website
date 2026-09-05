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
