import { Component } from 'engine/core/ecs';
import type { Time } from 'engine/core/time/time';

export class TimeManager extends Component {
  constructor(public time: Time) {
    super();
  }
}
