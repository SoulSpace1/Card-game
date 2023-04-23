export const difficultyScreen = {
  tag: 'div',
  cls: 'difficulty',
  content: [
    {
      tag: 'div',
      cls: 'difficulty_box',
      content: [
        {
          tag: 'div',
          cls: 'difficulty_select',
          content: [
            {
              tag: 'h1',
              cls: 'difficulty_select-title',
              content: 'easy',
            },
          ],
        },
        {
          tag: 'div',
          cls: 'difficulty_select',
          content: [
            {
              tag: 'h1',
              cls: 'difficulty_select-title',
              content: 'normal',
            },
          ],
        },
        {
          tag: 'div',
          cls: 'difficulty_select',
          content: [
            {
              tag: 'h1',
              cls: 'difficulty_select-title',
              content: 'hard',
            },
          ],
        },
      ],
    },
    {
      tag: 'button',
      cls: 'difficulty_button',
      content: 'choose',
    },
  ],
};

export const topBox = {
  tag: 'div',
  cls: 'game__top-box',
  content: [
    {
      tag: 'div',
      cls: 'game__top-box_timer',
      content: '00:00',
    },
    {
      tag: 'button',
      cls: 'restart_button',
      content: 'restart game',
    },
  ],
};
