import { Component } from 'engine/core/ecs';
import type { Time } from '.';

export class TimeManager extends Component {
  constructor(public time: Time) {
    super();
  }
}
