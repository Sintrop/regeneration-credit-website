export interface TutorialProps{
    id: string;
    title: string;
    description: string;
    username: string;
    repo: string;
    pathFile: string
}

const tutorialsListEN: TutorialProps[] = [
    {
        id: 'how-to-run-a-sintrop-node',
        title: 'howToRunASintropNode',
        description: 'descHowToRunASintropNode',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/nodes/how-to-run-sintrop.md'
    },
    {
        id: 'how-to-run-a-bootnode',
        title: 'howToRunABootnode',
        description: 'descHowToRunABootnode',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/nodes/how-to-run-bootnode.md'
    },
    {
        id: 'operation-and-commands',
        title: 'operationAndCommands',
        description: 'descOperationAndCommands',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/nodes/operation-and-commands.md'
    },
    {
        id: 'how-to-run-a-sintrop-node-with-docker',
        title: 'howToRunASintropNodeWithDocker',
        description: 'descHowToRunASintropNodeWithDocker',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/nodes/run-sintrop-with-docker.md'
    },
    {
        id: 'how-to-run-a-sequoia-node-with-docker',
        title: 'howToRunASequoiaNodeWithDocker',
        description: 'descHowToRunASequoiaNodeWithDocker',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/nodes/run-sequoia-with-docker.md'
    },
    {
        id: 'how-to-mine-sintrop-alone',
        title: 'howToSoloMineSintrop',
        description: 'descHowToSoloMineSintrop',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/en/mining/how-to-solo-mine-Sintrop.md'
    },
];

const tutorialsListPT: TutorialProps[] = [
    {
        id: 'como-rodar-um-node-na-sintrop',
        title: 'howToRunASintropNode',
        description: 'descHowToRunASintropNode',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/nodes/como-rodar-um-node-na-sintrop.md'
    },
    {
        id: 'como-rodar-um-bootnode-na-sintrop',
        title: 'howToRunABootnode',
        description: 'descHowToRunABootnode',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/nodes/como-rodar-um-bootnode.md'
    },
    {
        id: 'comandos-e-operacoes',
        title: 'operationAndCommands',
        description: 'descOperationAndCommands',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/nodes/comandos-e-operacoes.md'
    },
    {
        id: 'como-rodar-um-node-da-sintrop-com-docker',
        title: 'howToRunASintropNodeWithDocker',
        description: 'descHowToRunASintropNodeWithDocker',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/nodes/como-rodar-node-sintrop-com-docker.md'
    },
    {
        id: 'como-rodar-sequoia-testnet-com-docker',
        title: 'howToRunASequoiaNodeWithDocker',
        description: 'descHowToRunASequoiaNodeWithDocker',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/nodes/como-rodar-sequoia-testnet-com-docker.md'
    },
    {
        id: 'como-minerar-solo-sintrop',
        title: 'howToSoloMineSintrop',
        description: 'descHowToSoloMineSintrop',
        username: 'sintrop',
        repo: 'go-sintrop',
        pathFile: '/tutorials/pt/mining/como-minerar-solo-Sintrop.md'
    },
];

export const tutorialsListPerLanguage = {
    en: tutorialsListEN,
    pt: tutorialsListPT
}

export type LanguagesAvailablesForTutorials = keyof typeof tutorialsListPerLanguage