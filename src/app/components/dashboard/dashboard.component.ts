import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { Meliapi } from './../../services/melici.service';
import { MeliService } from './../../services/meli.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  calendarOptions: Object = {
    height: 'auto',
    fixedWeekCount : false,
    eventLimit: true,
    editable: true,
    events: [
      {
        className: ['badge', 'badge-pill', 'badge-info'],
        title: 'Llamar a proveedor',
        start: '2017-07-20',
        end: '2017-07-20'
      },
      {
        className: ['badge', 'badge-pill', 'badge-warning'],
        title: 'All Day Event',
        start: '2017-07-19',
        end: '2017-07-19'
      },
      {
        title: 'Long Event',
        start: '2017-07-19',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-07-19'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-07-19'
      },
      {
        title: 'Conference',
        start: '2017-07-19',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2017-07-19',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };

  viewsPerMonth = 0;
  questionsMonth = 0;

  constructor(private meliapi: Meliapi, private meliService: MeliService, private router: Router ) {
    // if (!localStorage.meli_access) {
    //   this.meliapi.getDataFromMeliapp().subscribe(res => {
    //     if (res.json() !== '404') {
    //       localStorage.setItem('meli_access', JSON.stringify(res.json()));
    //       location.reload();
    //     } else {
    //       this.router.navigate(['/loginml']);
    //     }
    //   });
    // }
    console.log('dash');
    // this.meliService.setGlobalVars();
  }

  ngOnInit() {
    if (localStorage.meli_access) {
      this.meliService.getViewsMonth()
        .subscribe((res) => this.viewsPerMonth = res.json().total_visits );

      this.meliService.getQuestionsMonth()
        .subscribe((res) => this.questionsMonth = res.json().total );
    }
  }

  onCalendarInit(e) {
    console.log(e);
  }

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }
}
