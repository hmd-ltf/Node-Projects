import * as parse from "csv-parse";
import * as fs from "fs";

const results: any[] = [];

const isHabitable = (planet: any): boolean => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("kepler_data.csv")
  .pipe(parse.parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    if (isHabitable(data)) {
      results.push(data);
    }
  })
  .on("end", () => {
    console.log("Finished taking data");
    console.log(`${results.length} habitable planets found!`);
    console.log(results.map((planet) => planet["kepler_name"]));
  })
  .on("error", (err) => {
    console.log(err);
  });
