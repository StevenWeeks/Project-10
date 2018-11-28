import React from 'react';
import {Link} from 'react-router-dom';

const CourseLister = (dets) => {
    return (
        <div className="grid-33"><Link to={{
            pathname: `/courses/${dets.id}`,
            state: { id: dets.id }
        }}
        className="course--module course--link">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{dets.title}</h3>
            </Link>
            </div>
    );
}

export default CourseLister;
