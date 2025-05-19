
export class campaign {
    id;
    title;
    description;
    creatorId;
    goal;
    donate;
    countDonations;
    deadline;
    isApproved;

    constructor(id,title,description,creatorId,goal,donate,countDonations,deadline,isApproved){
        this.id =id; 
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
        this.goal = goal;
        this.donate = donate;
        this.countDonations = countDonations;
        this.deadline = deadline;
        this.isApproved = isApproved;
    }

    valueProgress(){
        return Math.floor(this.countDonations / this.goal * 100);
    }
}