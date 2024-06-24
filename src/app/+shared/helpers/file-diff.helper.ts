import { Change } from 'diff';

export class FileDiffHelper {
  static generateDiff(diff: Change[], firstDisplay: HTMLElement | null, secondDisplay: HTMLElement | null): void {
    const firstFragment = document.createDocumentFragment();
    const secondFragment = document.createDocumentFragment();

    for (const part of diff) {
      const backgroundColor = part.added ? '#59CE8F' :
        part.removed ? '#FF0032' : 'none';
      const span = this.createSpanElement(part.value, backgroundColor);

      if (part.added) {
        secondFragment.appendChild(span);
      }

      if (part.removed) {
        firstFragment.appendChild(span);
      }

      if (!part.added && !part.removed) {
        secondFragment.appendChild(span);
        firstFragment.appendChild(this.createSpanElement(part.value, backgroundColor));
      }
    }

    firstDisplay?.appendChild(firstFragment);
    secondDisplay?.appendChild(secondFragment);
  }

  static createSpanElement(text: string, backgroundColor?: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.style.backgroundColor = backgroundColor || '';
    span.style.fontSize = '10pt';
    span.appendChild(document.createTextNode(text));

    return span;
  }
}
