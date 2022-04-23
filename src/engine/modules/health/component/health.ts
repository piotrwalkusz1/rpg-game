import { Component } from 'engine/core/ecs';

export class Health extends Component {
  private _healthPoints = 100;
  private _maxHealthPoints = 100;

  get healthPoints(): number {
    return this._healthPoints;
  }

  decreaseHealthPoints(value: number): void {
    if (value > 0) {
      this._healthPoints = Math.max(this.healthPoints - value, 0);
    }
  }

  get maxHealthPoints(): number {
    return this._maxHealthPoints;
  }

  get lostPercentageOfHealth(): number {
    return Math.ceil((100 * (this._maxHealthPoints - this.healthPoints)) / this._maxHealthPoints);
  }
}
