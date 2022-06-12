export type FieldPlacementId = `OUTSIDE` | `INSIDE` | `NEAR`;

export class FieldPlacement {
  static readonly OUTSIDE = new FieldPlacement('OUTSIDE');
  static readonly INSIDE = new FieldPlacement('INSIDE');
  static readonly NEAR = new FieldPlacement('NEAR');

  constructor(readonly id: FieldPlacementId) {}
}
