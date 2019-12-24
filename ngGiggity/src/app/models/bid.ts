export class Bid {
  id: number;
  available: boolean;
  bidAmount: number;
  description: string;
  accepted: boolean;
  bidderId: number;

  constructor(
    id?: number,
    available?: boolean,
    bidAmount?: number,
    accepted?: boolean,
    description?: string,
    bidderId?: number
  ) {
    this.id = id;
    this.available = available;
    this.bidAmount = bidAmount;
    this.description = description;
    this.accepted = accepted;
    this.bidderId = bidderId;
  }
}
