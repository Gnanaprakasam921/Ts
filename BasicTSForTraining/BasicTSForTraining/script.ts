interface TableData {
    id: number;
    name: string;
    age: number;
  }
  
  let data: TableData[] = [];
  let editingId: number | null = null;
  
  const form = document.getElementById("form") as HTMLFormElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const ageInput = document.getElementById("age") as HTMLInputElement;
  const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
  
    if (editingId !== null) {
      const index = data.findIndex((item) => item.id === editingId);
      if (index !== -1) {
        data[index] = { ...data[index], name, age };
        editingId = null;
      }
    } else {
      const newData: TableData = { id: data.length + 1, name, age };
      data.push(newData);
    }
  
    renderTable();
    form.reset();
  });
  
  const renderTable = () => {
    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>
          <button onclick="edit(${item.id})">Edit</button>
          <button onclick="remove(${item.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  };
  
  const edit = (id: number) => {
    editingId = id;
    const item = data.find((item) => item.id === id);
    if (item) {
      nameInput.value = item.name;
      ageInput.value = String(item.age);

    }
  };
  const add=()=>{
    form.reset();
    editingId = null;
  }

  const reset = () => {
    form.reset();
    editingId = null;
  }
  
  const remove = (id: number) => {
    data = data.filter((item) => item.id !== id);
    renderTable();
  };
  