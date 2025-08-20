// export const SUBJECTS = [
//   { value: "algdat", label: "TDT4120 - Algoritmer og Datastrukturer" },
//   { value: "itgk", label: "TDT4110 - Informasjonsteknologi Grunnkurs" },
//   { value: "objekt", label: "TDT4100 - Objektorientert Programmering" },
//   { value: "matte1", label: "TMA4100 - Matematikk 1" },
//   { value: "matte2", label: "TMA4105 - Matematikk 2" },
//   { value: "matte3", label: "TMA4115 - Matematikk 3" },
//   { value: "matte4n", label: "TMA4130 - Matematikk 4N" },
//   { value: "diskmat", label: "TMA4140 - Diskret Matematikk" },
//   { value: "ktn", label: "TTM4100 - Kommunikasjon Tjenester og Nett" },
// ];

export const SUBJECTS = [
  { value: "TDT4120", label: "Algoritmer og Datastrukturer" },
  { value: "TDT4110", label: "Informasjonsteknologi Grunnkurs" },
  { value: "TDT4100", label: "Objektorientert Programmering" },
  { value: "TMA4100", label: "Matematikk 1" },
  { value: "TMA4105", label: "Matematikk 2" },
  { value: "TMA4115", label: "Matematikk 3" },
  { value: "TMA4130", label: "Matematikk 4N" },
  { value: "TMA4140", label: "Diskret Matematikk" },
  { value: "TTM4100", label: "Kommunikasjon Tjenester og Nett" },
];

export const SIMPLE_SUBJECTS = SUBJECTS.map((subject) => {
  return {
    value: subject.value,
    label: subject.value,
  };
});

// export const SIMPLE_SUBJECTS = SUBJECTS.map((subject) => ({
//   ...subject,
//   label: subject.label.split(" - ")[0],
// }));
