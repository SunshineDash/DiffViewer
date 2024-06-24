import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { FileDiffHelper } from '../+shared/helpers/file-diff.helper';
import { FileDiffViewerComponent } from './file-diff-viewer.component';
import { FileModel } from '../+shared/models/file.model';

@Component({
  selector: 'app-test-host-component',
  template: `<app-file-diff-viewer [firstFile]="firstFile" [secondFile]="secondFile"></app-file-diff-viewer>`
})
class TestHostComponent {
  firstFile: FileModel = new FileModel();
  secondFile: FileModel = new FileModel();
}

describe('FileDiffViewerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let fileDiffViewerComponent: FileDiffViewerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDiffViewerComponent],
      declarations: [TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fileDiffViewerComponent = fixture.debugElement.children[0].componentInstance as FileDiffViewerComponent;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fileDiffViewerComponent).toBeTruthy();
  });

  it('should generate diff and update DOM elements', () => {
    spyOn(FileDiffHelper, 'generateDiff');

    fileDiffViewerComponent.ngOnInit();

    expect(FileDiffHelper.generateDiff).toHaveBeenCalled();
  });
});
