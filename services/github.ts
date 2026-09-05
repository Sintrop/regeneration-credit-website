import { ReleaseProps } from '@/types/github';

interface GetReleasesFromGitHubProps {
    username: string;
    repo: string;
}

export async function getReleasesFromGitHub(props: GetReleasesFromGitHubProps): Promise<ReleaseProps[]> {
    const { repo, username } = props;
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/releases`);
    const data = await response.json();

    if (data.message === 'Not Found') {
        return [];
    }

    return data;
}
