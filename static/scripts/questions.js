const questionsDiv = document.querySelector(".questions");
let topics = [];
let questions = [];

const toggleSolution = (id) => {
  const visibleSolutions = document.querySelectorAll(".solution-visible");
  const solution = document.getElementById(id);

  solution.classList.toggle("solution-visible");

  Array.from(visibleSolutions).forEach((e) => {
    if (e != solution) {
      e.classList.remove("solution-visible");
    }
  });
};

const add_topic_heading = (text) => {
  const topicHeading = document.createElement("h3");
  topicHeading.innerText = text;
  questionsDiv.append(topicHeading);
};

const filter_questions = (topic) => {
  const filtered_questions = questions.filter(
    (question) => question?.topic == topic
  );
  return filtered_questions;
};

const clean_code = (code) => {
  return code
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const add_question = (question) => {
  const html = `
    <div class="question">
        <h4>${question.title}</h4>
        <p>${question.description}</p>
        <div class="solution">
            <span onclick="toggleSolution(${
              question.id
            })">Toggle solution</span>
            <pre class="solution-code" id=${question.id}><code>${clean_code(
    question.solution
  )}</code></pre>
        </div>
    </div>
    `;
  questionsDiv.insertAdjacentHTML("beforeend", html);
};

const render_questions = () => {
  topics.forEach((topic) => {
    add_topic_heading(topic);
    const topic_questions = filter_questions(topic);

    if (topic_questions?.length > 0) {
      topic_questions.forEach((question) => add_question(question));
    } else {
      questionsDiv.insertAdjacentHTML(
        "beforeend",
        '<p class="text-muted">No questions related to this topic!</p>'
      );
    }
  });
};

fetch("/get_questions")
  .then(async (response) => {
    const data = await response.json();
    topics = data?.topics;
    questions = data?.questions;
  })
  .then(() => {
    document.querySelector(".loading").style.display = "none";
    render_questions();
  });
