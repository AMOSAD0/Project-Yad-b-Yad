
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
    img;
    category;

    constructor(title,description,creatorId,goal,donate,countDonations,deadline,isApproved,img,category){  
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
        this.goal = goal;
        this.donate = donate;
        this.countDonations = countDonations;
        this.deadline = deadline;
        this.isApproved = isApproved;
        this.img = img;
        this.category = category;
    }

    valueProgress(){
        return Math.floor(this.countDonations / this.goal * 100);
    }
}