// Getting today's date:
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}-${month}-${day}`;
console.log(currentDate);

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
        },
        {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
        },
        {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-25",
        score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-02-12",
        score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
        submitted_at: "2023-01-25",
        score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-24",
        score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-03-07",
        score: 140
        }
    },
];

let learnersArray = [];
let currentLearner;
let currentAssignment;

function getLearnersArray(submissions) {
    for (const obj in submissions ) {
        if (learnersArray.includes(submissions[obj].learner_id)) {
            continue;
        } else {
            learnersArray.push(submissions[obj].learner_id);
        };
    };
    for (let element in learnersArray) {
        learnersArray[element] = { id: learnersArray[element], avg: 0, total: 0,divisor: 0};
    }
    return learnersArray;
};

function handleSubmissionLogic(submissionObj, ag) {
    try {
        switch (submissionObj.assignment_id) {
            case 1 :
                currentAssignment = ag.assignments.find((element) => element.id === submissionObj.assignment_id);
                currentLearner = learnersArray.find((element) => element.id === submissionObj.learner_id);

                if (submissionObj.submission.submitted_at > currentAssignment.due_at) {
                    currentLearner[submissionObj.assignment_id] = parseFloat(((submissionObj.submission.score - 10) / currentAssignment.points_possible).toFixed(3));
                    currentLearner.total += (submissionObj.submission.score - 10);
                    currentLearner.divisor += currentAssignment.points_possible;

                    console.log("This assignment was submitted late!");
                } else {
                    currentLearner[submissionObj.assignment_id] = parseFloat((submissionObj.submission.score / currentAssignment.points_possible).toFixed(3));
                    currentLearner.total += submissionObj.submission.score;
                    currentLearner.divisor += currentAssignment.points_possible;
                };

                break;
            case 2 :
                currentAssignment = ag.assignments.find((element) => element.id === submissionObj.assignment_id);
                currentLearner = learnersArray.find((element) => element.id === submissionObj.learner_id);

                if (submissionObj.submission.submitted_at > currentAssignment.due_at) {
                    currentLearner[submissionObj.assignment_id] = parseFloat(((submissionObj.submission.score - 10) / currentAssignment.points_possible).toFixed(3));
                    currentLearner.total += (submissionObj.submission.score - 10);
                    currentLearner.divisor += currentAssignment.points_possible;

                    console.log("This assignment was submitted late!");
                } else {
                    currentLearner[submissionObj.assignment_id] = parseFloat((submissionObj.submission.score / currentAssignment.points_possible).toFixed(3));
                    currentLearner.total += submissionObj.submission.score;
                    currentLearner.divisor += currentAssignment.points_possible;
                };

                break;
            case 3 :
                throw new TypeError("This assignment is not yet due!");
        };
    } catch (error) {
        console.log(error);
    };
}

function getLearnerData(course, ag, submissions) {
// here, we would process this data to achieve the desired result.
    try {
        learnersArray = getLearnersArray(submissions);

        if (ag.course_id === course.id) {
            for (const obj in submissions) {
                // console.log(submissions[obj]);
                handleSubmissionLogic(submissions[obj], ag);
            };
        } else {
            throw new TypeError("Assignment group does not belong to this course!");
        }
    } catch (error) {
        console.error(error);
    };

    for (const obj in learnersArray) {
        learnersArray[obj].avg = (learnersArray[obj].total / learnersArray[obj].divisor);
        delete learnersArray[obj].total;
        delete learnersArray[obj].divisor;
    };

    return learnersArray;
};

const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(results);