import { ReleaseProps } from '@/types/github';
import { marked } from 'marked';

interface GetContentMDFromGitHubProps{
    username: string;
    repo: string;
    pathFile: string;
}

export async function getContentMDFromGitHub(props: GetContentMDFromGitHubProps){
    const {pathFile, repo, username} = props;
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents${pathFile}`);
    const data = await response.json();

    if (data.message === 'Not Found') {
        return "";
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const htmlContent = marked(content);

    return htmlContent as string;
}


interface GetReleasesFromGitHubProps{
    username: string;
    repo: string;
}

export async function getReleasesFromGitHub(props: GetReleasesFromGitHubProps): Promise<ReleaseProps[]>{
    const {repo, username} = props;
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/releases`);
    const data = await response.json();

    if (data.message === 'Not Found') {
        return [];
    }

    return data;
}