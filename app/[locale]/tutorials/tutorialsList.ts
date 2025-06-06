export interface TutorialProps {
  id: string;
  title: string;
  description: string;
  username: string;
  repo: string;
  pathFile: string
}

const tutorialsListEN: TutorialProps[] = [
  // {
  //   id: 'how-to-run-a-sintrop-node',
  //   title: 'howToRunASintropNode',
  //   description: 'descHowToRunASintropNode',
  //   username: 'sintrop',
  //   repo: 'go-sintrop',
  //   pathFile: '/tutorials/en/nodes/how-to-run-sintrop.md'
  // }
];

const tutorialsListPT: TutorialProps[] = [
  // {
  //   id: 'como-rodar-um-node-na-sintrop',
  //   title: 'howToRunASintropNode',
  //   description: 'descHowToRunASintropNode',
  //   username: 'sintrop',
  //   repo: 'go-sintrop',
  //   pathFile: '/tutorials/pt/nodes/como-rodar-um-node-na-sintrop.md'
  // },
];

export const tutorialsListPerLanguage = {
  en: tutorialsListEN,
  pt: tutorialsListPT
}

export type LanguagesAvailablesForTutorials = keyof typeof tutorialsListPerLanguage