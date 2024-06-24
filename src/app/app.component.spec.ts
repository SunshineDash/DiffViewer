import { CommonModule } from '@angular/common';
import { provideHttpClient} from '@angular/common/http';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FileApiService } from './+shared/services/file-api.service';
import { FILE_NAMES } from './+shared/constants/public-file-names.const';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fileApiService: FileApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule],
      providers: [
        FileApiService,
        provideHttpClient()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fileApiService = TestBed.inject(FileApiService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch files and assign them correctly', waitForAsync(() => {
    spyOn(fileApiService, 'getFile');

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.firstFile.name).toBe(FILE_NAMES[0]);
      expect(component.secondFile.name).toBe(FILE_NAMES[1]);
    });
  }));
});
