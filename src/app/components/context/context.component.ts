import { Component, OnInit } from '@angular/core';

class Clock {
  timeTemplate: string = "";
  clockHandler: number;
  target: HTMLElement;

  /**
   * @return string, time
   */
  getTime() {
      var date = new Date();
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  /**
   * Starts the clock
   */
  start(): void {
      /*
      I use the bind method to specify the "this" for interval's callback, because
      interval runs on a seperate execution context, and so the keyword this, 
      initialy refers to the window object.
      */
      this.clockHandler = setInterval(function (parent) {
          this.target.innerHTML = this.getTime();
      }.bind(this), 1000);
  }

  /**
   * Stops the clock by stoping the clock's interval
   */
  stop(): void {
      clearInterval(this.clockHandler);
  }

  /**
   * Binds the Clock to specified element's content
   * @param elem
   */
  bindTo(elem): void {
      this.target = elem;
      this.target.innerHTML = this.timeTemplate;
  }
}

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var clock = new Clock();

    clock.bindTo(document.getElementById("clock"));
    clock.start();
  }

}
