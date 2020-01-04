import { NgForm } from '@angular/forms';
import { SkillService } from './../../services/skill.service';
import { BookingService } from './../../services/booking.service';
import { ActiveBidPipe } from './../../pipes/active-bid.pipe';
import { JobService } from 'src/app/services/job.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSkill } from 'src/app/models/user-skill';
import { UserSkillService } from 'src/app/services/user-skill.service';
import { Job } from 'src/app/models/job';
import { Router, NavigationEnd } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { User } from 'src/app/models/user';
import { BidService } from 'src/app/services/bid.service';
import { Bid } from 'src/app/models/bid';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  title = 'Profile'; //
  userSelected: User = null; //
  userSkills: UserSkill[] = []; //
  updateGig: Job = null;
  selected: Job = null;
  userJobs: Job[] = []; //
  skillName: string;
  skills: Skill[]; //
  user: User;
  bids: Bid[];
  sellersBids: Bid[] = []; //
  selectedBid: Bid;
  booking: Booking = new Booking();
  selectSkills = null;
  userSkillDescription: string;
  updateProfile = false;
  username;
  updateUserSkillDesc = false;

  navigationSubscription;

  // tslint:disable-next-line: max-line-length

  constructor(
    private bidSvc: BidService,
    private userSvc: UserService,
    private userSkillSvc: UserSkillService,
    private jobSvc: JobService,
    private router: Router,
    private activeBid: ActiveBidPipe,
    private bookingSvc: BookingService,
    private skillsvc: SkillService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.updateGig = null;
        this.selected = null;
        this.skillName = null;
        this.selectedBid = null;
        // this.booking = null;
        this.selectSkills = null;
        this.userSkillDescription = null;
        this.updateProfile = false;
        this.updateUserSkillDesc = false;
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.userSvc.getUserByUsername().subscribe(
      data => {
        this.userSelected = data;
      },
      err => console.error('Reload error in User Component')
    );
    this.getUserJobs();
    this.showBidsByBidder();
    this.getAllSkills();
    this.getUserSkills();
  }

  chooseSkills() {
    this.selectSkills = true;
  }

  remove(job: Job) {
    job.active = false;
    this.update(job);
  }
  showProfile(username: string) {
    this.userSvc.profileUsername(username);
  }

  displaySelected(job) {
    this.selected = job;
  }

  setUpdateGig(job: Job) {
    this.selected = job;
    this.updateGig = Object.assign({}, job);
  }

  update(job: Job) {
    this.jobSvc.update(job.id, job).subscribe(
      data => {
        this.ngOnInit();

        this.updateGig = null;
      },
      err => {
        console.error('Update Job error in User Compnent');
      }
    );
  }

  getUserJobs() {
    this.userSvc.getJobsByUsername().subscribe(
      data => {
        this.userJobs = data;
      },
      err => console.error('Reload error in Component')
    );
  }

  hasActives(job: Job): boolean {
    var hasActive: boolean = false;
    job.jobBids.forEach(bid => {
      if (bid.accepted === false && bid.rejected === false) {
        hasActive = true;
      }
    });
    return hasActive;
  }

  getUserSkills() {
    this.userSvc.getSkillsByUsername().subscribe(
      data => {
        this.userSkills = data;
      },
      err => console.error('Reload error in Component')
    );
  }

  getSkillName(id) {
    this.userSkillSvc.findSkillName(id).subscribe(data => {
      this.skillName = data.name;
    });
  }

  showBids(job: Job) {
    this.selected = job;
    this.bids = job.jobBids;
  }

  viewAllGigs() {
    this.bids = null;
    this.selected = null;
    this.updateGig = null;
  }

  showBidsByBidder() {
    this.bidSvc.getBidsByBidder().subscribe(
      data => {
        this.sellersBids = data;
      },
      err => {
        console.error('Get error in search-result-Component showBidsByBidder');
      }
    );
  }

  acceptBid(bid: Bid) {
    this.selectedBid = bid;
    this.booking.bid = bid;
    this.booking.job = this.selected;
    this.bookingSvc.createBooking(this.booking).subscribe(
      data => {
        this.router.navigateByUrl('/bookings');
      },
      err => console.error('Create error in search-result-Component createBid')
    );

    for (let rejectBid of this.bids) {
      if (rejectBid.id === this.selectedBid.id) {
        rejectBid.accepted = true;
        rejectBid.rejected = false;
      } else {
        rejectBid.accepted = false;
        rejectBid.rejected = true;
      }
      this.bidSvc.updateBid(rejectBid).subscribe(
        data => {
          rejectBid = data;
        },
        err => {
          console.error('Update error in search-result-Component acceptBid');
        }
      );
    }

    // this.selectedBid.accepted = true;
    // this.selectedBid.rejected = false;
    // this.bidSvc.updateBid(this.selectedBid).subscribe(
    //   data => {
    //     this.selectedBid = data;
    //   },
    //   err => {
    //     console.error('Update error in USER acceptBid');
    //   }
    // );
  }

  rejectBid(rejectedBid: Bid) {
    rejectedBid.accepted = false;
    rejectedBid.rejected = true;
    if (this.hasActives(this.selected) === false) {
      this.selected = null;
    }
    this.bidSvc.updateBid(rejectedBid).subscribe(
      data => { },
      err => console.error('Create error in USER createBid')
    );
  }

  getAllSkills() {
    this.skillsvc.index().subscribe(
      data => {
        this.skills = data;
      },
      err => {
        console.log('Error getting SKills in User component');
      }
    );
  }

  addUserSkill(skill: Skill, descForm: NgForm) {
    const userSkill = new UserSkill();
    userSkill.skill = skill;

    var exists = false;
    const desc: string = descForm.value.userSkillDescription;

    userSkill.description = desc;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.userSkills.length; i++) {
      if (this.userSkills[i].skill.id === skill.id) {
        exists = true;
        userSkill.id = this.userSkills[i].id;
      }
    }
    if (!exists) {
      this.userSkillSvc.createUserSkill(userSkill).subscribe(
        data => {
          this.userSkills.push(userSkill);
        },

        err => {
          console.log('Error getting SKills in User component');
        }
      );
    } else {
      this.userSkillSvc.updateUserSkill(userSkill).subscribe(
        data => {
          console.log('UserSkill update completed');
        },
        err => {
          console.error('Update UserSkill Error: User Component');
        }
      );

    }


    this.selectSkills = null;
    this.ngOnInit();

  }


  userToUpdate() {
    this.updateProfile = true;
    this.userSvc.getUserByUsername().subscribe(
      data => {
        this.userSelected = data;
      },
      err => {
        console.error('userToUpdate Error: User Component');
      }
    );
  }

  updateUser() {
    this.userSvc.updateUser(this.userSelected).subscribe(
      data => {
        this.userSelected = data;
      },
      err => {
        console.error('Update User Error: User Component');
      }
    );
    this.updateProfile = false;
  }

  updateUserSkill(userSkillDesc: NgForm) {
    const userSkill = new UserSkill();
    userSkill.id = userSkillDesc.value.id;
    userSkill.description = userSkillDesc.value.description;

    // const desc: string = userSkillDesc.value.userSkillDesc;

    // userSkill.description = desc;

    this.userSkillSvc.updateUserSkill(userSkill).subscribe(
      data => {
        console.log('UserSkill update completed');
      },
      err => {
        console.error('Update UserSkill Error: User Component');
      }
    );
  }

  deleteUserSkill(skill: UserSkill) {
    this.userSkillSvc.deleteUserSkill(skill).subscribe(
      data => {
        console.log('UserSkill delete completed');
      },
      err => {
        console.error('Delete UserSkill Error: User Component');
      }
    );
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
