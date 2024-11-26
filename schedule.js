fetch("https://fir-b6113-default-rtdb.firebaseio.com/hero.json")
            .then(response => response.json())
            .then(data => {
                // Convert JSON data to an array for DataTables
                const tableData = Object.keys(data).map(key => {
                    const hero = data[key];
                    return [hero.name, hero.type, hero.timestamp];
                });

                // Initialize the DataTable
                const table = new DataTable("#example", {
                    ordering: false,
                    paging: false,
                    searching: false,
                    data: tableData,
                    columns: [
                        { title: "#" },
                        { title: "Title" },
                        { title: "Hero" },
                        { title: "Hero Type" },
                        { title: "Map" },
                        { title: "Mode" },
                        { title: "Featuring" },
                        { title: "Date" },
                        { title: "Code" },
                        { title: "Release Date" }
                    ]
                });
            })
            .catch(error => console.error('Error fetching JSON data:', error));