import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public mode: string = 'list';
    public todos: Todo[] = [];
    public title: string = "Lista de Tarefas";
    public form: FormGroup;

    constructor(private fb: FormBuilder) 
    {
        this.form = this.fb.group({
            title: ['', Validators.compose([
              Validators.minLength(3),
              Validators.maxLength(60),
              Validators.required,
            ])]
        });
        this.load();
    }

    changeMode(newMode: string)
    {
        this.mode = newMode;
    }

    clear()
    {
        this.form.reset();
    }

    add()
    {
        const title = this.form.controls['title'].value;
        this.todos.push(new Todo(this.todos.length+1, title, false));
        this.save();
        this.clear();
    }

    remove(todo: Todo)
    {
        const index = this.todos.indexOf(todo);
        if(index>=0)
        {
            this.todos.splice(index, 1);
        }
    }

    save()
    {
        const data = JSON.stringify(this.todos);
        localStorage.setItem('todos', data);
        this.mode = 'list';
    }

    load()
    {
        const data = localStorage.getItem('todos');
        if(data != null)
        {
            this.todos = JSON.parse(data);
        }
    }
    markAsDone(todo: Todo)
    {
        this.save();
        todo.done = true;
    }

    markAsUndone(todo: Todo)
    {
        this.save();
        todo.done = false;
    }
}
