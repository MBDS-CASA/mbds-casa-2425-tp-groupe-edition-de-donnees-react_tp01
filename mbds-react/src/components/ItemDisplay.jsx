function ItemDisplay({ item }) {
    return (
        <div>
            <p>Course: {item.course}</p>
            <p>Student: {`${item.student.firstname} ${item.student.lastname}`}</p>
            <p>Date: {item.date}</p>
            <p>Grade: {item.grade}</p>
        </div>
    );
}

export default ItemDisplay;