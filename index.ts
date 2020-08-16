interface Person {
    name: string;
    say: () => void
}

class Wo implements Person {
     public name = 'www';

      /**
       * name
       */
      public say() {
            console.log(this.name)
      }
}   

const ww = new Wo();
ww.say() 

function quickSort(arr: number[]): any[] {
    if (arr.length <= 2) {
        return arr.sort((a,b) => a - b );
    }

    const index = Math.floor(arr.length / 2);
    const middle = arr[index];

    const left = [];
    const right = [];
    for(let i = 0; i < arr.length; i++) {
        if (i !== index) {
            if (arr[i] <= middle) {
               left.push(arr[i])
            } else {
               right.push(arr[i])
            }
        }  
    }

    return [...quickSort(left), middle, ...quickSort(right)]
}

console.log(quickSort([4,8,3,5,23,18,97,66,45,33,11,22,17,12,88]))