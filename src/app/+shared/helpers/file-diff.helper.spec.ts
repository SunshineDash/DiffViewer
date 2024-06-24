import { Change } from 'diff';

import { FileDiffHelper } from './file-diff.helper';

describe('FileDiffHelper', () => {
  describe('createSpanElement', () => {
    it('should create a span element with correct text and background color', () => {
      const text = 'test text';
      const backgroundColor = 'rgb(255, 0, 50)';

      const span = FileDiffHelper.createSpanElement(text, backgroundColor);

      expect(span.tagName).toBe('SPAN');
      expect(span.style.backgroundColor).toBe(backgroundColor);
      expect(span.textContent).toBe(text);
    });

    it('should create a span element with correct text and default background color', () => {
      const text = 'test text';

      const span = FileDiffHelper.createSpanElement(text);

      expect(span.tagName).toBe('SPAN');
      expect(span.style.backgroundColor).toBe('');
      expect(span.textContent).toBe(text);
    });
  });

  describe('generateDiff', () => {
    let firstDisplay: HTMLElement;
    let secondDisplay: HTMLElement;

    beforeEach(() => {
      firstDisplay = document.createElement('div');
      secondDisplay = document.createElement('div');
      document.body.appendChild(firstDisplay);
      document.body.appendChild(secondDisplay);
    });

    afterEach(() => {
      document.body.removeChild(firstDisplay);
      document.body.removeChild(secondDisplay);
    });

    it('should correctly generate diff and update display elements', () => {
      const diff: Change[] = [
        { value: 'unchanged text' },
        { value: 'added text', added: true },
        { value: 'removed text', removed: true }
      ];

      FileDiffHelper.generateDiff(diff, firstDisplay, secondDisplay);

      expect(firstDisplay.children.length).toBe(2);
      expect(firstDisplay.children[0].textContent).toBe('unchanged text');
      expect(firstDisplay.children[0].computedStyleMap().get('background-color')?.toString()).toBe('rgba(0, 0, 0, 0)');
      expect(firstDisplay.children[1].textContent).toBe('removed text');
      expect(firstDisplay.children[1].computedStyleMap().get('background-color')?.toString()).toBe('rgb(255, 105, 105)');

      expect(secondDisplay.children.length).toBe(2);
      expect(secondDisplay.children[0].textContent).toBe('unchanged text');
      expect(secondDisplay.children[0].computedStyleMap().get('background-color')?.toString()).toBe('rgba(0, 0, 0, 0)');
      expect(secondDisplay.children[1].textContent).toBe('added text');
      expect(secondDisplay.children[1].computedStyleMap().get('background-color')?.toString()).toBe('rgb(89, 206, 143)');
    });
  });
});
