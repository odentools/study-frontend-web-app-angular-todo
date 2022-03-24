import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await render(AppComponent, {
      imports: [MaterialModule, FormsModule],
    });
  });

  it('初期状態でタスクが4件表示されているか', () => {
    // タスク数を検証
    const taskElems = screen.getAllByRole('option');
    expect(taskElems.length).toBe(4);
  });

  it('タスクを登録できるか', () => {
    // タスク名を入力
    const inputElem = screen.getByRole('textbox');
    userEvent.type(inputElem, 'テスト');

    // 登録ボタンを押す
    const sendBtn = screen.getByLabelText('登録');
    userEvent.click(sendBtn);

    // タスク数を検証
    const taskElems = screen.getAllByRole('option');
    expect(taskElems.length).toBe(5);

    // タスクの存在を確認
    expect(
      screen.getByRole('option', {
        name: 'テスト',
      })
    );
  });

  it('空欄でタスクを登録しようとするとエラーになるか', () => {
    // アラートダイアログを監視
    spyOn(window, 'alert');

    // 登録ボタンを押す
    const sendBtn = screen.getByLabelText('登録');
    userEvent.click(sendBtn);

    // アラートダイアログが表示されたことを検証
    expect(window.alert).toHaveBeenCalled();

    // タスク数を検証
    const taskElems = screen.getAllByRole('option');
    expect(taskElems.length).toBe(4);
  });
});
