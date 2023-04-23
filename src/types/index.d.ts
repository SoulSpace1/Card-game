export {};

declare global {
  interface Window {
    application: App;
  }
}

type App = {
  screens: Object;
  difficultyLevel: string;
  cardsTotal: Array<string>;
  cardsOpened: Array<EventTarget>;
  cardsToCompare: any;
  cardsLength: Array<string>;
  cardHideTimer: Array<NodeJS.Timer>;
  gameTimer: Array<NodeJS.Timer>;
};
