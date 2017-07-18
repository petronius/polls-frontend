
const API_SERVER = "https://polls.apiblueprint.org/";

const endpoints = {
    "root": `${API_SERVER}`,
    "questions_list": `${API_SERVER}questions`,
    "question_details": `${API_SERVER}questions/:id`
};

export default endpoints;