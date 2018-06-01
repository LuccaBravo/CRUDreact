import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
    {
        id: "01",
        title: "Cirurgia e Traumatologia Buco Maxilofacial",
        watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
        authorId: "Dr. Lucas Xavier",
        length: "1",
        category: "Cirurgião Geral"
    },
    {
        id: "02",
        title: "Dentística",
        watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
        authorId: "Dr. Lucas Xavier",
        length: "2",
        category: "Cirurgião Geral"
    },
    {
        id: "03",
        title: "Disfunção Têmporo Mandibular e Dor Oro Facial",
        watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
        authorId: "Dr. Lucas Xavier",
        length: "1",
        category: "Cirurgião Geral"
    },
    {
        id: "04",
        title: "Endodontia",
        watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
        authorId: "Dr. Lucas Xavier",
        length: "6",
        category: "Cirurgião Geral"
    },
    {
        id: "05",
        title: "Estomatologia",
        watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
        authorId: "Dr. Lucas Xavier",
        length: "4",
        category: "Cirurgião Geral"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
    return replaceAll(course.title, ' ', '-');
};

class CourseApi {
    static getAllCourses() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], courses));
            }, delay);
        });
    }

    static saveCourse(course) {
        course = Object.assign({}, course); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minCourseTitleLength = 1;
                if (course.title.length < minCourseTitleLength) {
                    reject(`Title must be at least ${minCourseTitleLength} characters.`);
                }

                if (course.id) {
                    const existingCourseIndex = courses.findIndex(a => a.id === course.id);
                    courses.splice(existingCourseIndex, 1, course);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids and watchHref's for new courses in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    course.id = generateId(course);
                    course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
                    courses.push(course);
                }

                resolve(course);
            }, delay);
        });
    }

    static deleteCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfCourseToDelete = courses.findIndex(course => course.id === courseId);
                courses.splice(indexOfCourseToDelete, 1);
                resolve();
            }, delay);
        });
    }


    static getCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingCourseIndex = courses.findIndex(course => course.id === courseId);
                
                const courseFound = Object.assign({}, courses[existingCourseIndex]);

                resolve(courseFound);

            }, delay);
        });
    }

}

export default CourseApi;
