import DashboardCard from "./DashboardCard.jsx";

const comments = [
  { id: 1, name: "DUSHYANT UPADHYAY", score: 10, location: "Ajmer", initials: "DU" },
  { id: 2, name: "DUSHYANT UPADHYAY", score: 10, location: "Ajmer", initials: "DU" },
  { id: 3, name: "K.S. Rawat", score: 4.3, location: "Ajmer", initials: "KS", note: "No" },
];

const LatestComments = () => {
  return (
    <DashboardCard title="Latest Comments" badge="Today">
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-[10px]">
              {comment.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-primary font-medium text-xs truncate">{comment.name}</span>
                <span className="text-muted-foreground text-[10px]">({comment.score})</span>
              </div>
            </div>
            <span className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0.5 rounded">
              {comment.location}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default LatestComments;
