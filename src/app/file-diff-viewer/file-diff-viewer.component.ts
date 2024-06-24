import { Component, Input, OnInit } from '@angular/core';
import { diffCss } from 'diff';

import { FileModel } from '../+shared/models/file.model';
import { FileDiffHelper } from '../+shared/helpers/file-diff.helper';

@Component({
  selector: 'app-file-diff-viewer',
  standalone: true,
  templateUrl: './file-diff-viewer.component.html',
  styleUrl: './file-diff-viewer.component.scss'
})
export class FileDiffViewerComponent implements OnInit {
  @Input() firstFile = new FileModel();
  @Input() secondFile = new FileModel();

  ngOnInit(): void {
    this.generateDiff();
  }

  private generateDiff(): void {
    const cssDiff = diffCss(this.firstFile.content, this.secondFile.content);
    const firstFileDisplay = document.getElementById('firstFileDisplay');
    const secondFileDisplay = document.getElementById('secondFileDisplay');

    FileDiffHelper.generateDiff(cssDiff, firstFileDisplay, secondFileDisplay);
  }
}
