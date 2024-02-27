class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null
    }
}

class Tree {
    constructor(arr, root=null){
        this.arr = arr
        this.root = root
    }
}   


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


function ordenarYEliminarDuplicados(array) {
    // Ordenar el array
    const arrayOrdenado = array.sort((a, b) => a - b);
  
    // Eliminar duplicados
    const arraySinDuplicados = [...new Set(arrayOrdenado)];
  
    return arraySinDuplicados;
  }

const resultado = ordenarYEliminarDuplicados(arr);
  

function buildTree(nums){

    // if the array is empty return NULL
    if (nums.length === 0) {
        return null;
    }

    const mid = Math.floor(nums.length / 2);
    const root = new Node(nums[mid]);
    
    // initializing queue
    const q = [[root, [0, mid - 1]], [root, [mid + 1, nums.length - 1]]];

    while (q.length > 0) {
        const [parent, [left, right]] = q.shift();

        // if there are elements to process and parent node is not NULL
        if (left <= right && parent != null) {
            const mid = Math.floor((left + right) / 2);
            const child = new Node(nums[mid]);

            // set the child node as left or right child of the parent node
            if (nums[mid] < parent.data) {
                parent.left = child;
            } else {
                parent.right = child;
            }

            // push the left and right child and their indices to the queue
            q.push([child, [left, mid - 1]]);
            q.push([child, [mid + 1, right]]);
        }
    }

    return root;
    }

let root = buildTree(resultado)
    
const newTree = new Tree(arr, root)

let node = newTree.root


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
function insert (value) {
        let node = root
        while(node.left !== null || node.right !== null){
            if(node.data>value){
                if(node.left === null){
                    node.left = new Node(value); return
                }
                node = node.left
            } else if (node.data<value) {
                if(node.right === null){
                    node.right = new Node(value); return
                }
                node = node.right
            } else return 
        }
        if(node.data>value){
            node.left = new Node(value)
        } else if (node.data<value){
            node.right = new Node(value)
        } else return 
    }



function deleteNode(value, root = node) {
   
    // Base case
    if (root === null) {
      return root;
    }
   
    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > value) {
      root.left = deleteNode(value, root.left);
      return root;
    } else if (root.data < value) {
      root.right = deleteNode(value, root.right);
      return root;
    }
   
    // We reach here when root is the node
    // to be deleted.
   
    // If one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    }
   
    // If both children exist
    else {
      let succParent = root;
   
      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
   
      // Delete successor.  Since successor
      // is always left child of its parent
      // we can safely mavaluee successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ.right to succParent.right
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
   
      // Copy Successor Data to root
      root.data = succ.data;
   
      // Delete Successor and return root
      delete succ;
      return root;
    }
  }

function find(value){
    let node = root
    if(node.data == value)return node;
    while((node.left == null || node.left.data !== value) && (node.right == null||node.right.data !== value)){
        if(node.data>value){
            node = node.left
            if(node===null){return "valor no encontrado"}
        } else if (node.data<value) {
            node = node.right
            if(node===null){return "valor no encontrado"}
        } 
    }
    if(node.data>value){
        return node.left
    } else if (node.data<value){
        return node.right
    } 
}


insert(12);
insert(15);
insert(9);
insert(11);
insert(26);
insert(5)
insert(35);
insert(24)
insert(2);
insert(6)
insert(10);
insert(300);
insert(260)
insert(120)
insert(7000)


//prettyPrint(root)

// console.log("-----------")

// const afterDelete = deleteNode(67)
// prettyPrint(afterDelete)

function levelorder(calback) {
    let example = root
    let queue = [];
    const traverse = []
    
    queue.push(example)

    while(queue.length>0){
      traverse.push(queue[0].data)
      if(queue[0].left !== null){
        queue.push(queue[0].left)
      }
      if(queue[0].right !== null){
        queue.push(queue[0].right)
      }
      queue.shift()
    }
    return traverse
} 
// console.log(root)

function inOrder(root) {
  const traverse = [];

  (function callback(node) {
    if (node === null) return;
    callback(node.left);
    traverse.push(node.data);
    callback(node.right);
  })(root);

  return traverse;
}

function preOrder(root) {
  const traverse = [];

  (function callback(node) {
    if (node === null) return;
    traverse.push(node.data);
    callback(node.left);
    callback(node.right);
  })(root);

  return traverse;
}

function postOrder(root) {
  const traverse = [];

  (function callback(node) {
    if (node === null) return;
    callback(node.left);
    callback(node.right);
    traverse.push(node.data);
  })(root);

  return traverse;
}

// console.log(inOrder(root));
// console.log(preOrder(root));
// console.log(postOrder(root));

//console.log(find(8))

function height(node) {
  const nodex = find(node);
  if(typeof nodex !== "object")return "Nodo no encontrado"  
  const altura = heightRec(nodex)
  return `Niveles hasta la hoja mas profunda: ${altura}`
}

function heightRec(node) {
  // Caso base: si el nodo es null, la altura es -1 (sin contar aristas)
  if (node === null) {
    return -1;
  }

  // Calcular la altura de los subárboles izquierdo y derecho
  const alturaIzquierda = heightRec(node.left);
  const alturaDerecha = heightRec(node.right);

  // Devolver la altura máxima más 1 (contando la arista desde el nodo actual al siguiente nivel)
  return Math.max(alturaIzquierda, alturaDerecha) + 1;
}

//console.log(height(2))

function depth(node) {
  const roots = root
  let depth = recursiveDepth(roots, node);
  return console.log(`Profundidad: ${depth}`)
}
function recursiveDepth(nodo, value, cont=0) {
  let count = 0
  if(nodo==null)return "Valor no encontrado"
  if(nodo.data==value){
    return cont
  }

  if(nodo.data>value){
    count = recursiveDepth(nodo.left, value, cont+1)
  } else {
    count = recursiveDepth(nodo.right, value, cont+1)
  }

  return count
}

//depth(2)

function isBalanced() {
  const nodex = root //find(node)  
  const subTreeLeft = isBalancedRec(nodex.left)
  const subTreeRight = isBalancedRec(nodex.right)
  
  console.log(`Alturas ${subTreeLeft} y ${subTreeRight}`)

  let valor = subTreeLeft - subTreeRight
  
  return (valor>1 || valor<-1) ?false:true 
}

function isBalancedRec(node) {
  // Caso base: si el nodo es null, la altura es -1 (sin contar aristas)
  if (node === null) {
    return -1;
  }

  // Calcular la altura de los subárboles izquierdo y derecho
  const alturaIzquierda = isBalancedRec(node.left);
  const alturaDerecha = isBalancedRec(node.right);

  // Devolver la altura máxima más 1 (contando la arista desde el nodo actual al siguiente nivel)
  return Math.max(alturaIzquierda, alturaDerecha) + 1;
}


//console.log(isBalanced())


function rebalance() {
  const boolean = isBalanced()
  if(boolean===false){
    const arrOrd = inOrder(root)
    //console.log(arrOrd)

    root = buildTree(arrOrd)
  }
}

// rebalance()

// console.log(isBalanced())
// prettyPrint(root)

// prettyPrint(node)




//TEST DRIVER SCRIPT

//1
function generarArrayAleatorio() {
  const arrayAleatorio = [];

  for (let i = 0; i < 16; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 101); // Genera un número entre 0 y 100
    arrayAleatorio.push(numeroAleatorio);
  }

  return arrayAleatorio;
}

// Llamada a la función para obtener el array aleatorio
const miArrayAleatorio = generarArrayAleatorio();
originTree(miArrayAleatorio)
// Imprimir el array generado
console.log(miArrayAleatorio);

function originTree(arr) {
  const arrSort = ordenarYEliminarDuplicados(arr);
  root = buildTree(arrSort)
}

console.log(root)
prettyPrint(root)

//2
console.log(isBalanced(root))

//3
console.log(inOrder(root));
console.log(preOrder(root));
console.log(postOrder(root));

//4
insert(105)
insert(110)
insert(160)
insert(200)
insert(240)
insert(144)
prettyPrint(root)

//5
console.log(isBalanced())

//6
rebalance()

//7
console.log(isBalanced())

//8
console.log(inOrder(root));
console.log(preOrder(root));
console.log(postOrder(root));

prettyPrint(root)
