class Tasks {
      public tasks: (() => Promise<any>)[] = [];
      public limitNum: number;
      public executing: number = 0;
      public taskData: any[] = [];
      public callback: any;

      constructor(tasks: (() => Promise<any>)[], limitNum: number, callback?: (data: any[]) => void) {
             this.tasks = tasks;
             this.limitNum = limitNum;
             this.callback = callback || null;
             this.executeTasks();
      }

      public finishHandle() {
          if (this.callback) {
              this.callback(this.taskData)
          }    
      }

      public executeTasks () {
          while(this.tasks.length && this.executing < this.limitNum) {
              const task = this.tasks[0];
              this.tasks = this.tasks.slice(1);
              this.executing = this.executing + 1;

              task().then(data => {
                  this.taskData.push(data);
                  this.executing = this.executing - 1;
                  if (!this.tasks.length && !this.executing) {
                      console.log('all finished')
                      this.finishHandle();
                  }    
                  this.executeTasks();
              }).catch(err => {
                  console.log(err);
                  this.executing = this.executing - 1;
              })
          }
      }


}

function genDelayPromise(time: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(Date.now());
        }, time);
    })
}

const tasks = Array.from({length: 50}, (_ ,index) => index ).map(item => {
    return () => genDelayPromise(1000 + 50*item)
}).map((task, index) => {
    return async () => {
        const time = Date.now();
        console.log(`task ${index+1} begin`);
        const data = await task();
        console.log(`task ${index+1} finish ${Date.now() - time}`);
        return data
    }
})

new Tasks(tasks, 5, data => console.log('the data is', data))

