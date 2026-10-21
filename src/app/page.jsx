import "./page.css";
import TaskCard from "@/components/TaskCard";
import New from "@/components/new";
async function LoadTask() {
  const res = await fetch("http://localhost:3000/api/notas");
  const data = await res.json();

  return data;
}

async function HomePage() {
  const tasks = await LoadTask();
  console.log(JSON.stringify(tasks, null, 2));

  return (
    <div>
      
      <div className="homePage">
      
        
        <New>
        </New>
        <div className="box">
          
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
            
        </div>
      </div>
    </div>
  );
}

export default HomePage;