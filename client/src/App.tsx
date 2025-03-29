import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Button from './components/Button'
import getAIResponse from './utils/genai'
import { ChevronRight, ChevronDown } from "lucide-react";

async function generateRoadmap(topic: string) {
  const aiResponse = await getAIResponse(`
    Generate a roadmap about ${topic}.
    Give the output in json format, the output should be in following format:
      {
        "name": "topic name",
        "subtopics": [{
          "name": "subtopic name",
          ...
        },
          ...
        ]
      }
    The root of the json should contain only 2 keys, name and subtopics, name should be name of topic and subtopics should be an array of objects, each object again containing name and subtopics. Do not make the depth more than 3
    The output should contain only json and nothing else.
  `)
  const roadmapJSON = aiResponse.response.replace('```json', '').replace('```', '')
  const roadmap = JSON.parse(roadmapJSON)
  
  return roadmap
}

const LoadingRoadmap = () => {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
      const interval = setInterval(() => {
          setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
  }, []);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Generating Roadmap{dots}</p>
      </div>
  );
};

const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-red-200", "bg-purple-200"];

const TreeNode = ({ node, level = 0 }) => {
    const [expanded, setExpanded] = React.useState(false);
    const hasChildren = node.subtopics && node.subtopics.length > 0;
    const colorClass = colors[level % colors.length];

    return (
        <div className={`border p-2 rounded-lg shadow-sm m-2 flex-1 ${colorClass}`}>
            <div
                className="flex items-center cursor-pointer py-1"
                onClick={() => setExpanded(!expanded)}
            >
                {hasChildren && (
                    expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
                <span className="ml-2 text-lg font-medium">{node.name}</span>
            </div>
            {expanded && hasChildren && (
                <div className="flex flex-wrap mt-2">
                    {node.subtopics.map((child, index) => (
                        <TreeNode key={index} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

function Roadmap(props: {
  roadmapObject: object
}) {

  const roadmap = props.roadmapObject

  return (
    <div className="p-4 shadow-lg w-full max-w-4xl mx-auto mt-8 border rounded-lg bg-white absolute">
        <h2 className="text-2xl font-bold mb-4">{roadmap.name}</h2>
        <div className="flex flex-wrap">
            {roadmap.subtopics.map((topic, index) => (
                <TreeNode key={index} node={topic} level={0} />
            ))}
        </div>
    </div>
  );
}

function TopicInput() {

  const [topic, setTopic] = React.useState('')
  const [roadmap, setRoadmap] = React.useState()
  const [showGenerateing, setShowGenerating] = React.useState(false)

  return (
    <div className='flex flex-col justify-center items-center h-[88vh]'>
      <div className='flex justify-center h-12 gap-5'>
        <input className='w-80 p-4 text-lg border-2 border-blue-500 rounded-[8px] shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none' type='text' name='topic' placeholder='What do you want to study?' onChange={(e) => setTopic(e.target.value)} />
        <Button onClick={ async () => {
          setShowGenerating(true)
          const roadmap = await generateRoadmap(topic)
          setShowGenerating(false)
          setRoadmap(roadmap)
        }} text="Generate Roadmap" />
      </div>

      {showGenerateing && <LoadingRoadmap />}

      {roadmap && <Roadmap roadmapObject={roadmap} />}

    </div>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <TopicInput />
      <Footer />
    </>
  )
}

export default App
