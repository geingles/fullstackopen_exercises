import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Courses = ({ courses }) => {
    return (
        <>
            { courses.map(
                element => (
                <div key={element.id}>
                    <Header key={'header_'+element.id} name={element.name} />
                    <Content key={'content_'+element.id} parts={element.parts} />
                    <Total Key={'total_'+element.id} parts={element.parts} />
                </div>
                )  
            )}
        </>
    )
}
        
export default Courses