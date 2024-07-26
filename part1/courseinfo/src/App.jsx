const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      { props.parts.map(
          element => (
            <Part key={element.name} part={element.name} exercise={element.exercises} /> )  
        )}
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce( (resp, val) => resp = resp + val.exercises, 0)
  return(
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}


const App = () => {
  /* const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14f*/

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App