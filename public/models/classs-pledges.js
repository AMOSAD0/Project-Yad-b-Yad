export class Pledge {
    id;
    campaignId;
    userId;
    amount;

    constructor(id, campaignId, userId, amount) {
        this.id = id;
        this.campaignId = campaignId;
        this.userId = userId;
        this.amount = amount;
    }
   
}