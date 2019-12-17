import { GroupService } from 'src/services/group.service';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  panelOpenState = false;
  LIFE_THREATENING_GROUP: any = [];
  FIRE_GROUP: any = [];
  ACCIDENT_GROUP: any = [];
  MEDICAL_GROUP: any = [];
  result: any;
  groupId: Number;
  newMemberName: string;
  newMemberNumber: string;

  constructor(private groupService: GroupService, private toast: ToastrManager) { }

  ngOnInit() {
    this.groupService.getGroupMembers().subscribe(response => {
      this.result = response;
      if (this.result.status === 'success') {
        this.LIFE_THREATENING_GROUP = this.result.data.LIFE_THREATENING_GROUP;
        this.FIRE_GROUP = this.result.data.FIRE_GROUP;
        this.ACCIDENT_GROUP = this.result.data.ACCIDENT_GROUP;
        this.MEDICAL_GROUP = this.result.data.MEDICAL_GROUP;
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
    }, error => {
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  addNewMember() {
    if (!this.groupId || !this.newMemberName || !this.newMemberNumber) {
      this.toast.warningToastr("Please fill all the values.", 'Oops!', { toastTimeout: 2000 });
      return;
    } else {
      this.groupService.addGroupMember({ GROUP_ID: this.groupId, MEMBER_NAME: this.newMemberName, MOBILE_NUMBER: "+91" + this.newMemberNumber }).subscribe(response => {
        this.result = response;
        if (this.result.status === 'success') {
          this.addMember(this.result.data.contactId);
        } else {
          this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
        }
      }, error => {
        this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
      });
    }
  }

  addMember(contactId) {
    //console.log(this.groupId);
    if (this.groupId == 1) {
      this.LIFE_THREATENING_GROUP.unshift({ MEMBER_NAME: this.newMemberName, MOBILE_NUMBER: "+91" + this.newMemberNumber, GROUP_ID: 1, CONTACT_ID: contactId });
    } else if (this.groupId == 2) {
      this.FIRE_GROUP.unshift({ MEMBER_NAME: this.newMemberName, MOBILE_NUMBER: "+91" + this.newMemberNumber, GROUP_ID: 2, CONTACT_ID: contactId });
    } else if (this.groupId == 3) {
      this.ACCIDENT_GROUP.unshift({ MEMBER_NAME: this.newMemberName, MOBILE_NUMBER: "+91" + this.newMemberNumber, GROUP_ID: 3, CONTACT_ID: contactId });
    } else if (this.groupId == 4) {
      this.MEDICAL_GROUP.unshift({ MEMBER_NAME: this.newMemberName, MOBILE_NUMBER: "+91" + this.newMemberNumber, GROUP_ID: 4, CONTACT_ID: contactId });
    }
    this.groupId = null;
    this.newMemberName = '';
    this.newMemberNumber = '';
  }

  removeMember(member) {
    this.groupService.removeGroupMember(member).subscribe(response => {
      this.result = response;
      if (this.result.status === 'success') {
        this.deleteMember(member);
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
    }, error => {
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  deleteMember(member: any) {
    if (member.GROUP_ID === 1) {
      this.LIFE_THREATENING_GROUP = this.LIFE_THREATENING_GROUP.filter(mem => mem.CONTACT_ID !== member.CONTACT_ID);
    } else if (member.GROUP_ID === 2) {
      this.FIRE_GROUP = this.FIRE_GROUP.filter(mem => mem.CONTACT_ID !== member.CONTACT_ID);
    } else if (member.GROUP_ID === 3) {
      this.ACCIDENT_GROUP = this.ACCIDENT_GROUP.filter(mem => mem.CONTACT_ID !== member.CONTACT_ID);
    } else {
      this.MEDICAL_GROUP = this.MEDICAL_GROUP.filter(mem => mem.CONTACT_ID !== member.CONTACT_ID);
    }
  }

}
