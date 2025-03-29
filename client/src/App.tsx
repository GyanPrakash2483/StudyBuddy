import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Button from './components/Button'
import getAIResponse from './utils/genai'

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
    The root of the json should contain only 2 keys, name and subtopics, name should be name of topic and subtopics should be an array of objects, each object again containing name and subtopics. Do not make the depth more than 2
    The output should contain only json and nothing else.
  `)
  const roadmapJSON = aiResponse.response.replace('```json', '').replace('```', '')
  const roadmap = JSON.parse(roadmapJSON)
  
  return roadmap
}

function GeneratingRoadmapComponent() {
  return (
    <div>
      Generating Roadmap...
    </div>
  )
}

function Tree(props: {
  data: {
    name: string,
    subtopics: [object]
  }
}) {

  return (
    <div>
      <div>{props.data.name}</div>
      {props.data.subtopics && <Tree data={props.data.subtopics} />}
    </div>
  ) 
}

function Roadmap(props: {
  roadmapObject: object
}) {

  const roadmap = props.roadmapObject

  return (
    <div>
      <Tree data={roadmap} />
    </div>
  )
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

      {showGenerateing && <GeneratingRoadmapComponent />}

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
