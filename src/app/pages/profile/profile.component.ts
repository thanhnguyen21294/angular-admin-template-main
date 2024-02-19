import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../@core/models/User';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserService } from '../../@core/services';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  DEFAULT_AVATAR = 'assets/images/default-avatar.png';

  constructor(private authService: NbAuthService, private userService: UserService, private toast: NbToastrService) {
    // Get user info
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });
  }

  submit() {
    console.log('Update profile');
  }

  uploadProfilePicture() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.userService.uploadProfilePicture(file).subscribe(fileUploaded => {
      this.user.avatar = fileUploaded.filepath;
      this.toast.success("Upload profile picture successfully.", "Success");
    });
  }
}
