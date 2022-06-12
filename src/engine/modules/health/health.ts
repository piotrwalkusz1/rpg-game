import { Component } from 'engine/core/ecs';

export class Health extends Component {
  private _healthPoints;
  private _maxHealthPoints;

  constructor(params?: { maxHealthPoints?: number }) {
    super();
    this._maxHealthPoints = params?.maxHealthPoints || 100;
    this._healthPoints = this._maxHealthPoints;
  }

  get healthPoints(): number {
    return this._healthPoints;
  }

  set healthPoints(healthPoints: number) {
    this._healthPoints = healthPoints;
  }

  decreaseHealthPoints(value: number): void {
    if (value > 0) {
      this._healthPoints = Math.max(this.healthPoints - value, 0);
    }
  }

  get lostPercentageOfHealth(): number {
    return Math.ceil((100 * (this._maxHealthPoints - this.healthPoints)) / this._maxHealthPoints);
  }
}
