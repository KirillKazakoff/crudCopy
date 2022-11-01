import { Component, Input } from '@angular/core';
import { UserT } from 'src/app/types.type';
import { ApiService } from '../../services/api/api.service';

@Component({
    selector: 'user-default',
    template: `
        <user
            #userForm
            class="user"
            [user]="user"
            [isEdit]="isEdit"
            [submitCb]="save()"
        >
            <user-default-controls
                (edit)="edit()"
                (remove)="remove()"
                [isEdit]="isEdit"
                class="user__controls"
                [isLoading]="userForm.isLoading"
            ></user-default-controls>
        </user>
    `,
})
export class UserDefaultComponent {
    isEdit = false;
    @Input() user!: UserT;

    constructor(private apiService: ApiService) {}

    save() {
        return async () => {
            await this.apiService.put(this.user);
            this.toggleEdit();
        };
    }

    async remove() {
        await this.apiService.deleteUser(this.user.id);
    }

    toggleEdit() {
        this.isEdit = !this.isEdit;
    }

    edit() {
        this.toggleEdit();
    }
}
