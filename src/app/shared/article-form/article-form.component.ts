import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleInputInterface } from '../types/article-input.interface';
import { BackendErrorsInterface } from '../types/backend-errors.interface';
import { BackendErrorMessagesComponent } from '../backend-error-messages/components/backend-error-messages.component';

/**
 * Component for creating and editing articles.
 * It provides a form with fields for the title, description, content (markdown supported), and tags.
 * Emits the form data to the parent component upon submission.
 */
@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, MarkdownModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  /**
   * Initial values to populate the form (used for editing an article).
   */
  @Input('initialValues') initialValues!: ArticleInputInterface;

  /**
   * Indicates whether the form is in a submitting state (e.g., during an API request).
   */
  @Input('isSubmitting') isSubmitting!: boolean | null;

  /**
   * Contains errors returned from the backend if the submission fails.
   */
  @Input('errors') errors!: BackendErrorsInterface | null;

  /**
   * Event emitted when the form is submitted with the article data.
   */
  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  fb = inject(FormBuilder);

  /**
   * Reactive form instance for handling form data and validation.
   */
  public form!: FormGroup;

  /**
   * Initializes the component.
   * - Initializes the reactive form for the article input.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the reactive form for the article input.
   * The form is created with the 'title', 'description', 'body', and 'tagList' fields.
   * The values of the form fields are initialized with the current article data,
   * and the tagList is joined into a single string with spaces as the separator.
   */
  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  /**
   * Handles the form submission event.
   * - Constructs an `ArticleInputInterface` object from the form values.
   * - Emits the `articleSubmitEvent` with the constructed `articleInput`.
   *
   * The `tagList` field from the form is split into an array of strings using spaces as the separator.
   * If the `tagList` is empty or undefined, an empty array is used.
   */
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
