// Shared settings for every chart, so fonts and colours match the page.
// Each spec can still override these for itself.
// Font names with a number in them must be quoted, or the browser ignores them.
const bodyFont = "'Source Sans 3', system-ui, sans-serif";
const headingFont = "Fraunces, Georgia, serif";

const chartConfig = {
  font: bodyFont,
  background: null,
  title: {
    font: headingFont,
    fontSize: 18,
    fontWeight: 600,
    color: "#1f2a24",
    subtitleFont: bodyFont,
    subtitleFontWeight: 400,
    subtitleFontSize: 14,
    subtitleColor: "#5b5850",
    subtitlePadding: 4,
    offset: 12
  },
  axis: {
    labelFontSize: 12,
    titleFontSize: 12,
    labelColor: "#5b5850",
    titleColor: "#5b5850",
    domainColor: "#c9c3b8",
    tickColor: "#c9c3b8"
  },
  legend: {
    labelFontSize: 12,
    labelColor: "#5b5850",
    labelLimit: 240
  },
  view: { stroke: null }
};

// actions: false hides the "..." menu
const embedOptions = { actions: false, config: chartConfig };

// Every chart on the page: [box id in index.html, spec file]
// To add a chart, add one line here.
const charts = [
  ["#chart-rescue-map", "specs/map_rescue_groups.vl.json"],
  ["#chart-treemap", "specs/treemap_charities.vg.json"],
  ["#chart-volunteers-staff", "specs/volunteers_vs_staff.vl.json"],
  ["#chart-rspca-trend", "specs/rspca_trend.vl.json"],
  ["#chart-animal-types", "specs/rspca_animal_outcomes.vl.json"],
  ["#chart-vic-shelters", "specs/map_vic_shelters.vl.json"],
  ["#chart-org-outcomes", "specs/outcomes_by_org_type.vl.json"],
  ["#chart-foster", "specs/foster_dumbbell.vl.json"],
  ["#chart-waffle", "specs/waffle_outcomes.vl.json"],
  ["#chart-vic-survival", "specs/map_vic_survival.vl.json"],
  ["#chart-heatmap", "specs/heatmap_euthanasia.vl.json"],
  ["#chart-adoption-returns", "specs/adoption_returns.vl.json"]
];

// Highlight the option that is currently picked in each radio switch.
// It finds each option's label whether Vega puts the button inside its
// label or just before it, then adds the class "is-picked" (styled in style.css).
function markPickedOptions(area) {
  area.querySelectorAll(".vega-bind-radio input[type='radio']").forEach((input) => {
    const label = input.closest("label") || input.nextElementSibling;
    if (label) {
      label.classList.toggle("is-picked", input.checked);
    }
  });
}

// Whenever someone picks a different option, update the highlight.
document.addEventListener("change", (event) => {
  const group = event.target.closest(".vega-bind-radio");
  if (group) {
    markPickedOptions(group);
  }
});

// Wait for the web fonts, so charts measure and draw text in the right font.
document.fonts.ready.then(() => {
  charts.forEach(([boxId, specFile]) => {
    vegaEmbed(boxId, specFile, embedOptions)
      .then(() => markPickedOptions(document.querySelector(boxId)))
      .catch((error) => {
        console.error("Chart failed to load:", specFile, error);
      });
  });
});
