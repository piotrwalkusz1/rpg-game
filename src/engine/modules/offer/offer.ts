import type { DeepReadonly } from 'ts-essentials';
import type { OfferClause } from './offer-clause';
import type { OfferDecision, OfferDecisionValue } from './offer-decision';
import type { OfferParty } from './offer-party';

export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export class Offer {
  private readonly _clauses: OfferClause[];
  private readonly _decisions: OfferDecision[];
  private _status: OfferStatus;

  constructor({ clauses, decisions }: { clauses: OfferClause[]; decisions: OfferDecision[] }) {
    this._clauses = [...clauses];
    this._decisions = [...decisions];
    this._status = Offer.calculateStatus(decisions);
  }

  get clauses(): readonly OfferClause[] {
    return this._clauses;
  }

  get parties(): readonly OfferParty[] {
    return this._decisions.map((decision) => decision.party);
  }

  get partiesWithPendingDecisions(): readonly OfferParty[] {
    return this.getPendingDecisions().map((decision) => decision.party);
  }

  get decisions(): DeepReadonly<OfferDecision[]> {
    return this._decisions;
  }

  get pendingDecisions(): DeepReadonly<OfferDecision[]> {
    return this.getPendingDecisions();
  }

  private getPendingDecisions(): OfferDecision[] {
    return this._decisions.filter((decision) => decision.pending);
  }

  makeDecision(decisionMaker: OfferParty, decisionValue: OfferDecisionValue): void {
    this._decisions.filter((decision) => decision.party === decisionMaker).forEach((decision) => (decision.value = decisionValue));
    this.refreshStatus();
  }

  get status(): OfferStatus {
    return this._status;
  }

  get pending(): boolean {
    return this._status == 'PENDING';
  }

  get accepted(): boolean {
    return this._status === 'ACCEPTED';
  }

  get rejected(): boolean {
    return this._status === 'REJECTED';
  }

  private refreshStatus(): void {
    this._status = Offer.calculateStatus(this._decisions);
  }

  private static calculateStatus(decisions: OfferDecision[]): OfferStatus {
    if (decisions.every((decision) => decision.value === 'ACCEPTED')) {
      return 'ACCEPTED';
    } else if (decisions.some((decision) => decision.value === 'REJECTED')) {
      return 'REJECTED';
    } else {
      return 'PENDING';
    }
  }
}
