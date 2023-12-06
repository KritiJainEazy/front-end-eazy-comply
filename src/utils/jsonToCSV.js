export const jsonToCSV = (fileTitle = "EazyComplyCSV", data = []) => {
  if (data?.length) {
    const csvData = [];
    const headers = Object?.keys(data[0]);
    csvData?.push(headers?.join(","));

    data?.forEach((dataItem) => {
      let dataRow = headers?.map((header) => {
        return dataItem[header];
      });

      csvData?.push(dataRow?.join(","));
    });

    let anchor = document.createElement("a");
    anchor.href =
      "data:text/csv;charset=utf-8," + encodeURI(csvData.join("\n"));
    // anchor.target = "_blank";
    anchor.download = `${fileTitle}.csv`;
    anchor.click();
    anchor.remove();

    console.log(csvData);
  }
};
