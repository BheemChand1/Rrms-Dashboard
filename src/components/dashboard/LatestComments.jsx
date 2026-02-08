import DashboardCard from "./DashboardCard.jsx";

const comments = [
  { id: 1, name: "DUSHYANT UPADHYAY", score: 10, location: "Ajmer", initials: "DU" },
  { id: 2, name: "DUSHYANT UPADHYAY", score: 10, location: "Ajmer", initials: "DU" },
  { id: 3, name: "K.S. Rawat", score: 4.3, location: "Ajmer", initials: "KS", note: "No" },
];

const LatestComments = () => {
  return (
    <DashboardCard title="Latest Comments" badge="Today's Comments">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-sm">
              {comment.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-primary font-medium text-sm">{comment.name}</span>
                <span className="text-muted-foreground text-sm">SCORE: {comment.score}</span>
                {comment.note && (
                  <span className="text-muted-foreground text-sm">{comment.note}</span>
                )}
              </div>
            </div>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              {comment.location}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default LatestComments;
