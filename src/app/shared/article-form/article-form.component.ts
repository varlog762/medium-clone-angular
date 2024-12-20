import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleInputInterface } from '../types/article-input.interface';
import { BackendErrorsInterface } from '../types/backend-errors.interface';
import { BackendErrorMessagesComponent } from '../backend-error-messages/components/backend-error-messages.component';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, MarkdownModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValues!: ArticleInputInterface;
  @Input('isSubmitting') isSubmitting!: boolean | null;
  @Input('errors') errors!: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const articleInput: ArticleInputInterface = {
      title: this.form.value.title,
      description: this.form.value.description,
      body: this.form.value.body,
      tagList: this.form.value.tagList
        ? this.form.value.tagList.split(' ')
        : [],
    };

    this.articleSubmitEvent.emit(articleInput);
  }
}
